import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UploadResponse {
  imageUrl: string;
}

@Component({
    selector: 'app-contato-modal',
    templateUrl: './contato-modal.component.html',
    styleUrls: ['./contato-modal.component.css']
})
export class ContatoModalComponent implements OnInit {
  form!: FormGroup;
  uploadUrl: string = 'http://localhost:8080/api/v1/contatos/upload';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<ContatoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  
  ngOnInit(): void {
    const contato = this.data.contato;
    
    this.form = this.fb.group({
      nome: [contato.nome, Validators.required],
      email: [contato.email, [Validators.required, Validators.email]],
      telefone:[contato.telefone, Validators.required],
      dataNascimento: [contato.dataNascimento, Validators.required],
    });
    this.previewUrl = contato.urlImagemPerfil;
  }

  applyPhoneMask(event: any) {
    let value = event.target.value;
    value = value.replace(/\D/g, "");
  
    value = value.substring(0, 11);
    console.log(value);
    if (value.length == 10) {
      value = value.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, "($1)$2-$3");
    } else if (value.length > 10) {
      value = value.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, "($1)$2-$3");
    }
    event.target.value = value;
    this.form.get('telefone')?.setValue(value); 
  }

  previewUrl: string | null = null;

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      const fileToPreview = files.item(0);
      if (fileToPreview) {
        const isValidImage = fileToPreview?.type.startsWith('image/');
        if(isValidImage) {
          this.previewImage(fileToPreview);
        } else {
          alert('Por favor, selecione um arquivo de imagem válido.');
          input.value = '';
        }
      }
    }
  }
  
  previewImage(file: File | null) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.previewUrl = event.target.result;
    }
    reader.readAsDataURL(file as Blob);
  }
  
  uploadImage(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    
    return this.http.post<UploadResponse>(this.uploadUrl, formData);
  }

  salvar() {
    console.log(this.form.valid);
    console.log(this.previewUrl);
    if (this.form.valid && this.previewUrl != null) {
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      const fileToUpload = fileInput?.files?.item(0);
      if (fileToUpload) {
        this.uploadImage(fileToUpload).subscribe({
          next: (response) => {
            this.finalizeSave(response.imageUrl);
          },
          error: (error: HttpErrorResponse) => {
            console.error('Erro ao fazer upload da imagem:', error);
          }
        });
      } else if (this.previewUrl) {
        this.finalizeSave(this.previewUrl);
      }
      else {
        //this.form.get('urlImagemPerfil')?.markAsTouched();
        alert('Por favor, selecione um arquivo de imagem válido.');
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  finalizeSave(urlImagemPerfil?: string) {
    const contatoAtualizado = this.form.value;
    contatoAtualizado.urlImagemPerfil = urlImagemPerfil;
    this.dialogRef.close(contatoAtualizado);
  }

}
