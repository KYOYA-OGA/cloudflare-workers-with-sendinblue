import { sendMail } from './sendMail';
import { Env, IInput } from './types';
import { validate } from './validator';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Max-Age': '86400',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'POST') {
      return handlePostRequest(request, env);
    } else if (request.method === 'OPTIONS') {
      return new Response('OK', { headers: corsHeaders });
    } else {
      return new Response('Object not found', {
        status: 404,
        statusText: 'Not Found',
      });
    }
  },
};

async function readRequestJsonOnly(request: Request) {
  const { headers } = request;
  const contentType = headers.get('content-type');

  if (!contentType) {
    throw new Error('Content-Type header is missing');
  }

  if (contentType.includes('application/json')) {
    const body = await request.json();
    return body;
  }

  throw new Error('Content-Type header is not supported');
}

async function handlePostRequest(request: Request, env: Env) {
  try {
    const response = (await readRequestJsonOnly(request)) as IInput;

    const results = validate(response);

    if (!results.valid) {
      return new Response(JSON.stringify(results), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    await sendMail(response, env);
    return new Response(
      JSON.stringify({ message: 'Message successfully sent!' }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    return new Response(error, {
      headers: { 'Content-Type': 'text/plain' },
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}
