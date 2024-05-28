import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useContext } from "react";
import { UrlFormModel } from "@/models/url-form.model";
import { UrlContext } from "@/contexts/url.context";
import { getParamFromUrlYt } from "@/helpers/param-from-url-yt.helper";

const schema: yup.ObjectSchema<UrlFormModel> = yup.object().shape({
  url: yup
    .string()
    .required()
    .min(4)
    .max(500)
    .url()
    .label("Url")
    .test({
      message: "There is no video at this url",
      test: (value) => {
        try {
          return typeof getParamFromUrlYt(value) === "string";
        } catch (e) {
          return false;
        }
      },
    }),
});

export const useUrlForm = () => {
  const { setFormatsByUrl, infoLoading } = useContext(UrlContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UrlFormModel>({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data: UrlFormModel) => {
    setFormatsByUrl(data);
  });

  return { register, errors, onSubmit, infoLoading };
};
