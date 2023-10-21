import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
    selector: 'app-contato-modal',
    templateUrl: './contato-modal.component.html',
    styleUrls: ['./contato-modal.component.css']
})
export class ContatoModalComponent implements OnInit {
  form!: FormGroup;
  imgurUrl: string = 'https://api.imgur.com/3/image';

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
      dataNascimento: [contato.dataNascimento, Validators.required]
    });
  }

  previewUrl: string | null = null;

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      const fileToUpload = files.item(0);
      if (fileToUpload) { 
        this.uploadToImgur(fileToUpload);
      }
    }
  }

  convertToBase64(file: File | null, callback: (result: string) => void) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      callback(event.target.result.split(',')[1]);
    }
    reader.readAsDataURL(file as Blob);
  }
  
  previewImage(file: File | null) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.previewUrl = event.target.result;
    }
    reader.readAsDataURL(file as Blob);
  }

  uploadToImgur(file: File) {
    const headers = new HttpHeaders({
      'Authorization': 'Client-ID 9e2de936d89e6ce'
    });
    
    const formData = new FormData();
    formData.append('image', file, file.name);
    
    this.http.post<any>(this.imgurUrl, formData, { headers }).subscribe({
      next: (response) => {
        console.log(response);
        const imageUrl = response.data.link;
        this.form.get('imagemUrl')?.setValue(imageUrl);
      },
      error: error => {
        console.error('Erro ao fazer upload da imagem:', error);
      }
    });
  }  
  
  salvar() {
    if (this.form.valid) {
      const contatoAtualizado = this.form.value;
      this.dialogRef.close(contatoAtualizado);
    }
  }
}
