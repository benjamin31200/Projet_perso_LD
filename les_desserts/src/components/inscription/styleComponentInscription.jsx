import styled from "styled-components";

export const Form = styled.form.attrs({
    method: "post",
    action: "/inscription"
})`
`;

export const InputName = styled.input.attrs(props => ({ 
    type: "text", 
    name: "name",
    placeholder: "Prénom",
    value: props.nameValue
}))``;

export const InputLastname = styled.input.attrs(props => ({ 
    type: "text", 
    name: "lastname",
    class: "swal2-input",
    placeholder: "Nom",
    value: props.lastnameValue
}))``;

export const InputPseudonyme = styled.input.attrs(props => ({ 
    type: "text", 
    name: "pseudonyme",
    class: "swal2-input",
    placeholder: "Pseudonyme",
    value: props.pseudonymeValue
}))``;

export const InputEmail = styled.input.attrs(props => ({ 
    type: "email", 
    name: "email",
    class: "swal2-input",
    placeholder: "email",
    value: props.emailValue
}))``;

export const InputPassword = styled.input.attrs(props => ({ 
    type: "password", 
    name: "password",
    class: "swal2-input",
    placeholder: "Mot De Passe",
    value: props.passwordValue
}))``;

export const InputRepeatPassword = styled.input.attrs(props => ({ 
    type: "password", 
    name: "repeat_password",
    class: "swal2-input",
    placeholder: "confirmer Mot De Passe",
    value: props.repeatPasswordValue
}))``;

export const InputSubmit = styled.input.attrs({
    type: "submit", 
    id: "submit",
    placeholder: "Envoyer",
    value: "Submit"
})``;


