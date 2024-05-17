import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useContext } from 'react';
import {UrlFormModel} from "@/models/url-form.model";
import {UrlContext} from "@/contexts/url.context";

const schema: yup.ObjectSchema<UrlFormModel> = yup.object().shape({
    url: yup.string().required().min(4).max(500).url().label('Url'),
});

export const useUrlForm = () => {
    const { setFormatsByUrl, loading } = useContext(UrlContext);

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

    return { register, errors, onSubmit, loading };
};
