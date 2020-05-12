import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidations } from '../FormValidations';

@Component({
	selector: 'app-form-message-erro',
	template: `
		<p-message severity="error" [text]="errorMessage" *ngIf="errorMessage != null"></p-message>
	`,
	styles: []
})
export class FormMessageErroComponent {
	@Input() labelCampo: string;
	@Input() control: FormControl;

	get errorMessage() {
	if (this.control != null) {
		for (const propertyName in this.control.errors) {
			if (this.control.errors.hasOwnProperty(propertyName) && this.control.dirty) {
				return FormValidations.getErrorMsg(this.labelCampo, propertyName, this.control.errors[propertyName]);
			}
		}
	}
		return null;
	}

}
