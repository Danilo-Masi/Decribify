import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

export default function AlertMessage() {
  return (
    <Alert color="failure" icon={HiInformationCircle}>
      <span className="font-medium">Info alert!</span> Change a few things up and try submitting again.
    </Alert>
  )
}
