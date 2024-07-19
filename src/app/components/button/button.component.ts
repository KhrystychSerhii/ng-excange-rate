import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md'; // Размер кнопки, по умолчанию 'md'
  @Input() icon: string | null = null;     // Иконка для кнопки
  @Input() label: string = '';             // Текст кнопки
  @Input() type: 'button' | 'submit' | 'reset' = 'button'; // Тип кнопки
}
