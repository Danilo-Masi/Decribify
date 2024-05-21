import { Dispatch, SetStateAction, useEffect, useState } from "react";
//Components
import ProductForm from "./ProductForm";
import ProductCaption from "./ProductCaption";
import ProductTitle from "./ProductTitle";
import ProductDetails from "./ProductDetails";
import SkeltonPlaceholder from "./SkeltonPlaceholder";

interface ProductProps {
    setModalWaitListOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Product({ setModalWaitListOpen }: ProductProps) {

    const [titleGenerated, setTitleGenerated] = useState("");
    const [descriptionGenerated, setDescriptionGenerated] = useState("");
    const [isLaoding, setLoading] = useState(false);

    //Imposta e reimposta lo stato in modo tale da creare un animazione
    useEffect(() => {
        const interval = setInterval(() => {
            setLoading(prevState => !prevState);
        }, 3000);
        return () => clearInterval(interval);
    })

    return (
        <div className="w-full md:w-3/4 h-auto flex flex-col md:flex-row gap-5 p-5 mb-10 rounded-xl z-10 bg-custom-elevation2 dark:bg-dark-elevation2">
            <div className="w-full md:w-1/2 h-auto flex flex-col items-center justify-center gap-y-6">
                <ProductDetails />
                <ProductForm handleGeneration={() => setModalWaitListOpen(true)} />
            </div>
            <div className="w-full md:w-1/2 h-auto flex flex-col items-center justify-center gap-y-6">
                {isLaoding ? <SkeltonPlaceholder skeletonStyle="h-[25svh]" /> : <ProductTitle titleGenerated={titleGenerated} />}
                {isLaoding ? <SkeltonPlaceholder skeletonStyle="h-full min-h-[35svh]" /> : <ProductCaption descriptionGenerated={descriptionGenerated} />}
            </div>
        </div>
    );
}
