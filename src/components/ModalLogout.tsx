//Flowbite
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

interface ModalConfirmProps {
    onConfirm: () => void;
    onClose: () => void;
}

export default function ModalConfirm({ onConfirm, onClose }: ModalConfirmProps) {
    return (
        <Modal show={true} size="sm" onClose={onClose} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-custom-textPrimary dark:text-dark-textPrimary" />
                    <h3 className="mb-5 text-lg font-normal text-custom-textPrimary dark:text-dark-textPrimary">
                        Are you sure you want to signout?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={onConfirm}>
                            {"Yes, I'm sure"}
                        </Button>
                        <Button color="gray" onClick={onClose}>
                            No, cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}