import { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
//Supabase
import { supabase } from '../services/client.tsx';
//Components
import AccessBox from "../components/AccessBox";
import Layout from "../components/Layout";
import ContainerInput from "../components/ContainerInput";

function SignupForm() {

    //Funzione per navigare tra le varie pagine
    const navigate: NavigateFunction = useNavigate();

    const [termsCheckbox, setTermsCheckbox] = useState(false);
    const [signupForm, setSignupForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    //Imposta lo stato dei vari input presenti nel form
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        setSignupForm(prevState => ({
            ...prevState,
            [fieldName]: event.target.value
        }))
    }

    //Funzione per effettuare la registrazione di un nuovo utente
    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //Validazione dei dati /***** DA IMPLEMENTARE ******/
        try {
            const { data, error } = await supabase.auth.signUp({
                email: signupForm.email,
                password: signupForm.password,
            });
            if (error) {
                console.error("Error during signup:", error);
                alert('Error during signup: ' + error.message);
                return;
            } else {
                alert('Check your email to confirm the account');
                alert('Utente registrato correttamente');
                sessionStorage.setItem('token', JSON.stringify(data));
                navigate('/');
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert('Error during signup');
        }
    };


    return (
        <form
            onSubmit={handleSignup}
            className="w-full md:w-1/2 h-[88svh] md:h-full flex flex-col gap-5 items-center justify-center px-6 md:px-32 bg-gray-100">
            <ContainerInput flexOrentation="flex-col">
                <h1 className="text-2xl font-bold">Your best work start here</h1>
            </ContainerInput>
            <ContainerInput flexOrentation="flex-col">
                <label htmlFor="input-signup-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                    type="email"
                    id="input-signup-email"
                    name="input-signup-email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="name@describify.com"
                    required
                    value={signupForm.email}
                    onChange={event => handleChange(event, 'email')} />
            </ContainerInput>
            <ContainerInput flexOrentation="flex-col">
                <label htmlFor="input-signup-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input
                    placeholder="•••••••••"
                    type="password"
                    id="input-signup-password"
                    name="input-signup-password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                    value={signupForm.password}
                    onChange={event => handleChange(event, 'password')} />
            </ContainerInput>
            <ContainerInput flexOrentation="flex-col">
                <label htmlFor="input-signup-repet-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                <input
                    placeholder="•••••••••"
                    type="password"
                    id="input-signup-repet-password"
                    name="input-signup-repet-password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                    value={signupForm.confirmPassword}
                    onChange={event => handleChange(event, 'confirmPassword')} />
            </ContainerInput>
            <ContainerInput flexOrentation="flex-row">
                <div className="flex items-center h-5">
                    <input
                        id="terms"
                        type="checkbox"
                        value=""
                        name="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                        required
                        checked={termsCheckbox}
                        onChange={() => setTermsCheckbox(!termsCheckbox)} />
                </div>
                <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
            </ContainerInput>
            <ContainerInput flexOrentation="flex-col">
                <button type="submit" className="w-full md:w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Register new account</button>
            </ContainerInput>
            <ContainerInput flexOrentation="flex-row">
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account? <Link to="/signin" className="text-blue-700 font-medium">Login here</Link>
                </p>
            </ContainerInput>
        </form>
    );
}

export default function SignupPage() {
    return (
        <Layout padding="p-0" mdFlexOrientation="md:flex-row" mdHeight="md:h-svh">
            <SignupForm />
            <AccessBox />
        </Layout>
    );
}
