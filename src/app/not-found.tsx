import Button from '@/components/Button';

export default function NotFound() {
  return (
    <div className="pt-24 px-4 sm:px-8 min-h-[60vh] flex items-center justify-center">
      <div className="max-w-3xl w-full text-center">
        <p className="text-8xl font-extrabold text-slate-900 mb-4">404</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Page not found</h1>
        <p className="text-lg text-slate-600 mb-8">
          The page you&apos;re looking for was moved or doesn&apos;t exist.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button href="/" variant="primary" size="lg">Home</Button>
          <Button href="https://workflowengine.io/documentation" variant="secondary" size="lg">Documentation</Button>
        </div>
      </div>
    </div>
  );
}
