import {
  MOCK_CLIENTS,
  MOCK_INVOICES,
  MOCK_INVOICE_EXCEPTIONS,
  MOCK_RECENT_ACTIVITY,
  STATS,
} from '@/lib/data';

export async function GET(): Promise<Response> {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  return new Response(
    JSON.stringify({
      ok: true,
      data: {
        clients: MOCK_CLIENTS,
        invoices: MOCK_INVOICES,
        exceptions: MOCK_INVOICE_EXCEPTIONS,
        activity: MOCK_RECENT_ACTIVITY,
        stats: STATS,
      },
      total: MOCK_INVOICE_EXCEPTIONS.length, // Primary entity for total count
    }),
    { status: 200, headers: headers }
  );
}

export async function POST(request: Request): Promise<Response> {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const body = await request.json();
    return new Response(
      JSON.stringify({
        ok: true,
        message: 'Demo mode — data not persisted',
        received: body,
      }),
      { status: 200, headers: headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: 'Invalid JSON body',
      }),
      { status: 400, headers: headers }
    );
  }
}

export async function OPTIONS(): Promise<Response> {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  return new Response(null, { status: 200, headers: headers });
}