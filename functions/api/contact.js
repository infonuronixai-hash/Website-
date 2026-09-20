function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function onRequestPost({ request, env }) {
  const contentType = request.headers.get('content-type') || '';
  let data;
  if (contentType.includes('application/json')) {
    data = await request.json();
  } else {
    const form = await request.formData();
    data = Object.fromEntries(form.entries());
  }

  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  const phone = String(data.phone || '').trim();
  const organization = String(data.organization || '').trim();
  const message = String(data.message || '').trim();

  const errors = [];
  if (!name) errors.push('Please enter your name.');
  else if (name.length > 120) errors.push('Name must be 120 characters or fewer.');

  if (!email || !isValidEmail(email)) errors.push('Please enter a valid email address.');

  if (phone.length > 30) errors.push('Phone number must be 30 characters or fewer.');
  if (organization.length > 150) errors.push('Organization must be 150 characters or fewer.');

  if (!message) errors.push('Please enter a message.');
  else if (message.length > 2000) errors.push('Message must be 2000 characters or fewer.');

  if (errors.length > 0) {
    return Response.json({ success: false, errors }, { status: 400 });
  }

  await env.DB.prepare(
    'INSERT INTO leads (name, email, phone, organization, message, received_at) VALUES (?, ?, ?, ?, ?, ?)',
  )
    .bind(name, email, phone || null, organization || null, message, new Date().toISOString())
    .run();

  return Response.json({ success: true, name });
}

export async function onRequestGet() {
  return new Response('Method Not Allowed', { status: 405 });
}
