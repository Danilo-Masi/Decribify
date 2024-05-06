import { useState } from "react";
//Axios
import axios from 'axios';
//GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
//I18Next
import { useTranslation } from 'react-i18next';
//Components
import ModalMessage from "./ModalMessage";

// Funzione per validare l'email lato Client
const validateEmail = (email: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    }
    return false;
}

interface WaitlistGadgetProps {
    mdWidth?: string;
    buttonColor?: string;
}

export default function WaitlistGadget({ buttonColor, mdWidth }: WaitlistGadgetProps) {

    const { t } = useTranslation();

    const [emailInput, setEmailInput] = useState("");
    const [errorInput, setErrorInput] = useState("");
    const [emailLoading, setEmailLoading] = useState(false);
    const [emailSend, setEmailSend] = useState(false);

    //Funzione per inviare l'email di confermata iscrizione alla waitlist
    const sendWaitlistEmail = async () => {
        try {
            const response = await axios.post('http://localhost:3000/send-email', { email: emailInput });
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    // Funzione per aggiungere un'email al software di waitlist
    const submitWaitlist = async (e: any) => {
        e.preventDefault();
        setEmailLoading(true);
        setErrorInput("");
        if (validateEmail(emailInput)) {
            try {
                const response = await axios.post('http://localhost:3000/signup-to-waitlist', { email: emailInput });
                if (response.status === 200) {
                    const emailSent = await sendWaitlistEmail();
                    if (emailSent) {
                        alert('Iscrizione alla waitlist effettuata con successo e email inviata!');
                    } else {
                        alert('Iscrizione alla waitlist effettuata, ma invio email fallito.');
                    }
                    setEmailLoading(false);
                    setEmailInput("");
                    setEmailSend(true);
                } else {
                    alert('Errore durante l\'iscrizione alla waitlist.');
                    setEmailLoading(false);
                }
            } catch (error) {
                console.error('Errore:', error);
                setErrorInput("Si è verificato un errore durante l'iscrizione alla waitlist.");
                setEmailLoading(false);
            }
        } else {
            const erroreEmail = t('waitlistGadgetError');
            setErrorInput(erroreEmail);
            setEmailLoading(false);
        }
    };

    return (
        <form className={`flex flex-col md:flex-row items-start justify-center w-full gap-y-5 z-10 ${mdWidth ? mdWidth : 'md:w-2/6'}`}>
            {/* Email input */}
            <div className="w-full">
                <input
                    type="email"
                    name="email-input"
                    className={`w-full bg-custom-elevation dark:bg-dark-elevation3 border border-custom-borderGray dark:border-dark-borderGray focus:border-custom-borderFocusGray dark:focus:border-dark-borderFocusGray focus:ring-custom-borderRingGray dark:focus:ring-dark-borderRingGray text-custom-textPrimaryGray dark:text-dark-textPrimaryGray placeholder:text-custom-textSecondaryGray dark:placeholder:text-dark-textSecondaryGray text-sm rounded-lg block p-3 ${errorInput !== "" && 'border-red-500 dark:border-red-500'}`}
                    placeholder="name@describify.com"
                    value={emailInput}
                    onFocus={() => setErrorInput("")}
                    onChange={(event) => setEmailInput(event.target.value)} />
                <p className={`w-full mt-2 px-3 text-sm font-medium text-red-500 dark:text-red-500 ${errorInput !== "" ? 'flex' : 'hidden'}`}>
                    {errorInput}
                </p>
            </div>
            {/* Buttons */}
            {emailLoading ? (
                <button disabled type="button" className=" inline-flex items-center justify-center w-full md:w-min py-3 px-5 md:ms-2 text-sm font-medium text-dark-textPrimaryGray rounded-lg border bg-custom-solidColor dark:bg-dark-solidColor hover:bg-custom-hoverColor dark:hover:bg-dark-hoverColor">
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>
                    Loading...
                </button>
            ) : (
                <button
                    onClick={submitWaitlist}
                    type="submit"
                    className={`w-full md:w-min py-3 px-5 md:ms-2 text-sm font-medium text-dark-textPrimaryGray rounded-lg border ${buttonColor ? buttonColor : 'bg-custom-solidColor dark:bg-dark-solidColor hover:bg-custom-hoverColor dark:hover:bg-dark-hoverColor border-0'}`}>
                    Iscriviti
                </button>
            )}
            {/* Modal */}
            {emailSend ? <ModalMessage onClose={() => setEmailSend(false)} /> : ''}
        </form >

    )
}
