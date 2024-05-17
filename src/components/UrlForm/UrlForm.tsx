'use client'
import {useUrlForm} from "@/components/UrlForm/url-form.hook";
import Loader from "@/components/Loader";

function UrlForm() {

    const {register, errors, onSubmit, loading} =
        useUrlForm();

    return (
        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-1 sm:flex-row">
            <div>
                <input {...register('url')} className='main-input mb-2'/>
                <p className='form-wrong'>{errors?.url?.message}</p>
            </div>
            {loading ?
                (
                    <button className='main-button'>
                        <Loader/>
                    </button>
                ) : (
                    <button type='submit' className='main-button'>
                        GO
                    </button>
                )}

        </form>
    )
}

export default UrlForm;
