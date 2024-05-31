"use client";
import { useUrlForm } from "./url-form.hook";
import Loader from "@/components/Loader";

function UrlForm() {
  const { register, errors, onSubmit, infoLoading } = useUrlForm();

  return (
    <form onSubmit={onSubmit} className="mt-6 flex gap-2 flex-row">
      <div>
        <input {...register("url")} className="main-input mb-2" type="search" />
        <p className="form-wrong">{errors?.url?.message}</p>
      </div>
      {infoLoading ? (
        <button className="main-button">
          <Loader />
        </button>
      ) : (
        <button type="submit" className="main-button">
          GO
        </button>
      )}
    </form>
  );
}

export default UrlForm;
