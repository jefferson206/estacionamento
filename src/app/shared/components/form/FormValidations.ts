import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {
    static requiredMinCheckbox(min = 1) {
        const validator = (formArray: FormArray) => {
            const totalChecked = formArray.controls.map(v => v.value).reduce((total, current) => (current ? total + current : total), 0);
            return totalChecked >= min ? null : { required: true };
        };
        return validator;
    }

    static equalsTo(otherField: string) {
        const validator = (formControl: FormControl) => {
            if (otherField == null) {
                throw new Error('É necessário informar um campo.');
            }

            if (!formControl.root || !(formControl.root as FormGroup).controls) {
                return null;
            }

            const field = (formControl.root as FormGroup).get(otherField);

            if (!field) {
                throw new Error('É necessário informar um campo válido.');
            }

            if (field.value !== formControl.value) {
                return {equalsTo: otherField};
            }

            return null;
        };
        return validator;
    }

    static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
        const config = {
            required: `O campo ${fieldName || ''} é obrigatório.`,
            minlength: `O campo ${fieldName || ''} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
            maxlength: `O campo ${fieldName || ''} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
            cepInvalido: 'CEP inválido.',
            emailInvalido: 'Email já cadastrado!',
            email: 'Formato de e-mail inválido',
            equalsTo: 'Campo de confirmação está diferente',
            pattern: 'Campo inválido',
            cpfNotValid: 'CPF inválido',
            minDate: 'Data não pode ser inferior a 95 anos',
            maxDate: `Data não pode ser superior a data atual`,
            dateInvalidFormat: 'Informe uma data válida',
            celularInvalido: 'Celular inválido',
            cpfExistente: 'CPF já cadastrado'
        };

        return config[validatorName];
    }
}
