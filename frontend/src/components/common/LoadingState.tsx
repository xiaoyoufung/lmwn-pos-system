import Spinner from "../ui/Spinner";

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Spinner size="lg" />
      <p className="mt-4 text-sm text-gray-600">Loading...</p>
    </div>
  )
}