import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import { SmtpClient } from 'npm:@orama/smtp-client@1.0.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { from, to, subject, body } = await req.json();

    // Get SMTP credentials from environment variables
    const smtpClient = new SmtpClient({
      host: 'smtp.gmail.com',
      port: 993,
      username: from,
      password: Deno.env.get('GMAIL_APP_PASSWORD'), // You'll need to set this up
      secure: false,
      auth: {
        user: from ,
        pass: Deno.env.get('GMAIL_APP_PASSWORD'),
      },
    });

    await smtpClient.connect();
    
    await smtpClient.send({
      from: from,
      to: [to],
      subject: subject,
      content: body,
    });

    await smtpClient.close();

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});