import { Component, OnInit } from "@angular/core";
import { LoginTokenService } from "src/app/shared/loginToken/login-token.service";
import { UploadHelperService } from "src/app/shared/upload-service/upload-helper.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-demo-user-upload",
  templateUrl: "./demo-user-upload.component.html",
  styleUrls: ["./demo-user-upload.component.scss"]
})
export class DemoUserUploadComponent implements OnInit {
  setupObject: any = {};
  uploadErrors: any = {};
  FilesToUpload: any[];


  constructor(private loginToken: LoginTokenService, private uploadSvc: UploadHelperService, private toastr: ToastrService) {
    this.FilesToUpload = [];
  }

  ngOnInit() {
    this.loginToken.LoadComplete(false);
    this.setupObject = {
      id: 123,
      helpText:
        "<p><strong>Have you ever been embarrassed?</strong></p><p>Upload a picture of yourself when you've been embarrassed at some time in the past.</p>",
      type: "image/*",
      restraints: {
        size: 3 * 1024, // in KiBs
        width: 1024, // in pixels
        height: 1024
      },
      numberAllowed: 2
    };
  }

  UserUploadOpenUploadDialog() {

    if (!this.FilesToUpload.length) {
      const self = this;
      var input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", this.setupObject.type);
      if (this.setupObject.numberAllowed > 1) {
        input.setAttribute("multiple", "");
      }

      input.onchange = function () {
        self.uploadErrors = {};

        var files = input.files;

        if (files.length > self.setupObject.numberAllowed) {
          self.uploadErrors.numberAllowed = true;
          return;
        }

        for (let index = 0; index < files.length; index++) {
          const file = files[index];

          if (
            self.setupObject.type != "" &&
            file.type.split("/")[0] != self.setupObject.type.split("/")[0]
          ) {
            self.uploadErrors.type = true;
            return;
          }

          if (
            self.setupObject.restraints.size != "" &&
            file.size / 1024 > self.setupObject.restraints.size
          ) {
            self.uploadErrors.size = true;
            return;
          }

          // no errors
          // get preview ready

          let reader = new FileReader();
          reader.onload = function () {
            // console.log('Read file ', file.name, reader.result);
            let previewData: any = {};
            previewData.base64 = reader.result.split(',')[1];
            previewData.blob = reader.result;
            self.FilesToUpload.push({ fileData: file, previewData: previewData });
          };
          reader.onerror = function (errors) {
            console.error('Reader error:', errors);

          }

          reader.readAsDataURL(file);

          // push to array


          if (index == files.length - 1) {
            return;

          }
        }


      };

      input.click();
    }

    else {
      // otherwise, just run the uplaods and get the photos resized [phase 1]
      this.GetPhotosResized();
      // @TODO: Phase 2: all files support
    }

  }

  GetPhotosResized() {
    if (this.FilesToUpload.length && confirm('Upload these files?')) {
      const self = this;
      let uploadable = [];
      this.FilesToUpload.forEach((file, index) => {
        uploadable.push(file.previewData);
      });

      this.loginToken.LoadComplete(true);
      this.uploadSvc.GetImagesResized(uploadable).subscribe((resp: any) => {
        // console.log(resp);
        self.setupObject.uploadedFiles = resp.data;
        self.FilesToUpload = [];
        self.loginToken.LoadComplete(false);
        self.toastr.success('Files uploaded and saved', 'Done');
      }, (err: HttpErrorResponse) => {

      });


    }
  }

  // EOF
}
