import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from './Button';

export function UiComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-zinc-50 p-4 rounded-xl shadow-sm">
      <h2 className="font-bold text-zinc-900 tracking-tight">UI Component</h2>
      <p className="text-zinc-600">This is a sample UI component.</p>
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
      <p className="text-zinc-600">Count: {count}</p>
    </div>
  );
}