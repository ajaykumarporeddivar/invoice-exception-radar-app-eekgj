import {
  MOCK_CLIENTS,
  MOCK_INVOICES,
  MOCK_INVOICE_EXCEPTIONS,
} from '@/lib/data';
import { type InvoiceException, type Invoice, type Client } from '@/lib/types';
import { NextRequest } from 'next/server';

type SearchResult =
  | InvoiceException
  | Invoice
  | Client
  | { id: string; name: string; type: string; description: string };

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type'); // Optional: 'clients', 'invoices', 'exceptions'
  const lowerCaseQuery = query.toLowerCase();

  let results: SearchResult[] = [];

  if (!query) {
    // If query is empty, return first 5 exceptions
    results = MOCK_INVOICE_EXCEPTIONS.slice(0, 5);
  } else {
    if (!type || type === 'exceptions') {
      const exceptionResults = MOCK_INVOICE_EXCEPTIONS.filter(
        (e) =>
          e.description.toLowerCase().includes(lowerCaseQuery) ||
          e.type.toLowerCase().includes(lowerCaseQuery) ||
          e.status.toLowerCase().includes(lowerCaseQuery) ||
          e.severity.toLowerCase().includes(lowerCaseQuery)
      );
      results.push(...exceptionResults);
    }

    if (!type || type === 'invoices') {
      const invoiceResults = MOCK_INVOICES.filter(
        (i) =>
          i.invoiceNumber.toLowerCase().includes(lowerCaseQuery) ||
          i.status.toLowerCase().includes(lowerCaseQuery) ||
          i.amount.toString().includes(lowerCaseQuery)
      );
      results.push(...invoiceResults);
    }

    if (!type || type === 'clients') {
      const clientResults = MOCK_CLIENTS.filter((c) =>
        c.name.toLowerCase().includes(lowerCaseQuery)
      );
      results.push(...clientResults);
    }
  }

  // Deduplicate results if necessary (e.g., if an item matches multiple criteria)
  // For simplicity, we'll assume distinct IDs across types or prioritize by type
  // For now, simple slice, no complex deduplication across different entity types.
  const uniqueResults = Array.from(new Set(results.map((r: any) => r.id))).map((id) => {
    return results.find((r: any) => r.id === id);
  }) as SearchResult[];


  const limitedResults = uniqueResults.slice(0, 20);

  return Response.json({
    ok: true,
    data: {
      results: limitedResults,
      total: limitedResults.length,
      query: query,
    },
  });
}