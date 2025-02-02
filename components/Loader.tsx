// components/Loader.tsx

const Loader = () => {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loader;
