import { useState, useEffect } from 'react';
import { IMaskInput } from 'react-imask';

import {
    TextInput,
} from '@mantine/core';


const BuscaCEP = ({ cep, onChange , onChangeCep}) => {
    const [respostaCep, setRespostaCep] = useState({
        logradouro: "",
        cidade: "",
        estado: "",
        bairro: "",
    });

    useEffect(() => {
        if (cep) {
          const ceptemp = cep.replace('-', '')

        if (ceptemp.length === 8) {
            fetch(`https://viacep.com.br/ws/${ceptemp}/json/`, { method: "GET" })
                .then((respostaInicial) => {
                    return respostaInicial.json();
                })
                .then((informacoesCEP) => {
                    setRespostaCep({
                        logradouro: informacoesCEP.logradouro,
                        cidade: informacoesCEP.localidade,
                        estado: informacoesCEP.uf,
                        bairro: informacoesCEP.bairro,
                    });
                    if (informacoesCEP.erro) {
                        setRespostaCep({
                            logradouro: "",
                            cidade: "",
                            estado: "",
                            bairro: "",
                        });
                    }
                });
        }
    }
    }, [cep]);

    useEffect(() => {
        fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${respostaCep.logradouro},${respostaCep.localidade},${respostaCep.bairro},${respostaCep.estado}&components=country:BR&key=AIzaSyArDnDLobuCturWp6Q7jO3poS-gUN3GFfk`,
            { method: "GET" }
        )
            .then((respostaInicial) => {
                return respostaInicial.json();
            })
            .then((geocode) => {
                if (respostaCep.localidade !== "") {
                    onChangeCep({
                        ...respostaCep, latitude: geocode.results[0].geometry.location.lat,
                        longitude: geocode.results[0].geometry.location.lng,
                    })
                }
            });
    }, [respostaCep]);

    return (

        <TextInput
            withAsterisk
            label="CEP"
            placeholder="Informe o CEP"
            mask="00000-000"
            component={IMaskInput}
            required
            value={cep}
            radius="md"
            onChange={onChange}
        />

    )
}

export default BuscaCEP;
