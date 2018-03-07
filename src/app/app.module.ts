import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from './service/employee.service';
import { SpeechRecognitionService } from './service/speech-recognition.service';

@NgModule({
    imports: [
        //angular builtin module
        BrowserModule,
        HttpClientModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        EmployeeComponent
    ],
    providers: [
      EmployeeService,
        SpeechRecognitionService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {
}