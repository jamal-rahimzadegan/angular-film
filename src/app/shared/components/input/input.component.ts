import {Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInput,
    MatFormField,
    MatLabel,
    MatError
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements Partial<HTMLInputElement> {
  @Input() label: string = ''
  @Input() error: string = ''
  @Input() placeholder: string = ''
  @Input() type: HTMLInputElement['type'] = ''

}
