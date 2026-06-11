import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

const { cookiesMock, notFoundMock, redirectMock } = vi.hoisted(() => ({
  cookiesMock: vi.fn(),
  notFoundMock: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
  redirectMock: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  }),
}));

vi.mock('next/headers', () => ({
  cookies: cookiesMock,
}));

vi.mock('next/navigation', () => ({
  notFound: notFoundMock,
  redirect: redirectMock,
}));

import AdminPage from '../app/admin/page';
import ArticleDetailPage from '../app/articles/[slug]/page';
import ArticlesPage from '../app/articles/page';
import CollectionDetailPage from '../app/collections/[slug]/page';
import CollectionsPage from '../app/collections/page';
import DashboardPage from '../app/dashboard/page';
import Home from '../app/page';
import ProfilePage from '../app/profile/page';
import SearchPage from '../app/search/page';
import { articles, collections, homepage, trends } from '../lib/content';

afterEach(() => {
  vi.clearAllMocks();
});

function createCookieStore(role?: string) {
  return {
    get(name: string) {
      if (name === 'demo-role' && role) {
        return { value: role };
      }

      return undefined;
    },
  };
}

describe('page rendering', () => {
  it('renders homepage content from the shared content model', () => {
    const markup = renderToStaticMarkup(Home());

    expect(markup).toContain(homepage.summary);
    expect(markup).toContain(collections[0].title);
    expect(markup).toContain(articles[0].title);
    expect(markup).toContain(trends[0]);
  });

  it('renders the article index with the current article titles', () => {
    const markup = renderToStaticMarkup(ArticlesPage());

    expect(markup).toContain(articles[0].title);
    expect(markup).toContain(articles[1].title);
    expect(markup).toContain('Read article');
  });

  it('filters the collections page on the server using the query param', async () => {
    const result = await CollectionsPage({
      searchParams: Promise.resolve({ q: 'oak' }),
    });
    const markup = renderToStaticMarkup(result);

    expect(markup).toContain('Atelier Oak');
    expect(markup).not.toContain('Luna Terrace');
    expect(markup).not.toContain('Studio Echo');
  });

  it('renders a collection detail page for a valid slug', async () => {
    const result = await CollectionDetailPage({
      params: Promise.resolve({ slug: collections[0].slug }),
    });
    const markup = renderToStaticMarkup(result);

    expect(markup).toContain(collections[0].title);
    expect(markup).toContain(collections[0].description);
    expect(markup).toContain(collections[0].palette.join(' · '));
  });

  it('triggers notFound for an unknown collection slug', async () => {
    await expect(
      CollectionDetailPage({
        params: Promise.resolve({ slug: 'missing-collection' }),
      }),
    ).rejects.toThrow('NEXT_NOT_FOUND');

    expect(notFoundMock).toHaveBeenCalledTimes(1);
  });

  it('renders an article detail page for a valid slug', async () => {
    const result = await ArticleDetailPage({
      params: Promise.resolve({ slug: articles[0].slug }),
    });
    const markup = renderToStaticMarkup(result);

    expect(markup).toContain(articles[0].title);
    expect(markup).toContain(articles[0].excerpt);
    expect(markup).toContain(articles[0].body);
  });

  it('triggers notFound for an unknown article slug', async () => {
    await expect(
      ArticleDetailPage({
        params: Promise.resolve({ slug: 'missing-article' }),
      }),
    ).rejects.toThrow('NEXT_NOT_FOUND');

    expect(notFoundMock).toHaveBeenCalledTimes(1);
  });

  it('renders the dashboard with the current cookie role', async () => {
    cookiesMock.mockResolvedValue(createCookieStore('editor'));

    const result = await DashboardPage();
    const markup = renderToStaticMarkup(result);

    expect(markup).toContain('Authenticated dashboard');
    expect(markup).toContain('Current demo session role: editor');
  });

  it('renders the profile with a default viewer role when no cookie is present', async () => {
    cookiesMock.mockResolvedValue(createCookieStore());

    const result = await ProfilePage();
    const markup = renderToStaticMarkup(result);

    expect(markup).toContain('Profile overview');
    expect(markup).toContain('Role context: viewer');
  });

  it('redirects non-admin users away from the admin page', async () => {
    cookiesMock.mockResolvedValue(createCookieStore('viewer'));

    await expect(AdminPage()).rejects.toThrow('NEXT_REDIRECT:/');

    expect(redirectMock).toHaveBeenCalledWith('/');
  });

  it('renders the admin page for admin users', async () => {
    cookiesMock.mockResolvedValue(createCookieStore('admin'));

    const result = await AdminPage();
    const markup = renderToStaticMarkup(result);

    expect(markup).toContain('Admin area');
    expect(markup).toContain('Protected route enforcement');
  });

  it('renders the initial interactive search view without fetching on the server', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const markup = renderToStaticMarkup(<SearchPage />);

    expect(markup).toContain('Interactive search');
    expect(markup).toContain('Search for moods, materials, or collections');
    expect(markup).not.toContain('No matches yet. Try another phrase.');
    expect(fetchSpy).not.toHaveBeenCalled();

    fetchSpy.mockRestore();
  });
});
