import { Component, OnInit } from "@angular/core";
import { UrlsService } from "../../../shared/urls.service";
import { LanguageService } from "../../../shared/languages/language.service";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-languages",
  templateUrl: "./languages.component.html",
  styleUrls: ["./languages.component.scss"]
})
export class LanguagesComponent implements OnInit {
  languages: any = [];
  working = true;
  rootUrl = UrlsService.apiUrl;
  newLanguage: any = { name: "", abbr: "" };

  constructor(
    private langSvc: LanguageService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getLanguages();
  }

  trackByFn(row, index) {
    return index;
  }

  getLanguages() {
    this.working = true;
    this.langSvc.getLanguages().subscribe(
      (resp: any) => {
        resp.languages.map((row, index) => {
          row.editing = false;
          row.newName = row.name;
          row.newAbbr = row.abbr;
          row.working = false;
        });
        this.languages = resp.languages;
        this.working = false;
      },
      (err: HttpErrorResponse) => {
        console.log("error fetching Languages:", err);
        this.working = false;
      }
    );
  }

  UpdateLanguage(language) {
    language.working = true;
    if (language.name === "") {
      this.toastr.error("The name cannot be empty", "Invalid Input");
      language.working = false;
    } else {
      this.langSvc.UpdateLanguage(language).subscribe(
        (resp: any) => {
          language.name = resp.data.name;
          language.abbr = resp.data.abbr;
          language.editing = false;
          language.working = false;
          this.toastr.success("The Language was updated.", "Success");
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.toastr.error(
            "Sorry, there was an error processing your request. Please check your input and try again.",
            "Failed"
          );
          language.working = false;
        }
      );
    }
  }

  AddLanguage() {
    this.working = true;
    if (this.newLanguage.name == "" || this.newLanguage.name.length < 1) {
      this.toastr.error(
        "Please provide a name for the Language.",
        "Invalid Input"
      );
      this.working = false;
    } else {
      this.langSvc.StoreNewLanguage(this.newLanguage).subscribe(
        (resp: any) => {
          resp.data.map((row, index) => {
            row.editing = false;
            row.newName = row.name;
            row.newAbbr = row.abbr;
            row.working = false;
            this.working = false;
            this.newLanguage.name = "";
            this.newLanguage.abbr = "";
          });
          this.toastr.success("Please wait while the list reloads", "Success");
          this.languages = resp.data;
        },
        (err: HttpErrorResponse) => {
          this.toastr.error("Please check the input", "Unable to store");
          this.working = false;
        }
      );
    }
  }

  RemoveLanguage(intel) {
    if (
      confirm(
        "WARNING! \nAre you sure you want to do this? \nThis action cannote be undone."
      )
    ) {
      intel.working = true;
      this.langSvc.DeleteLanguage(intel.id).subscribe(
        (resp: any) => {
          this.languages.splice(this.languages.indexOf(intel), 1);
          this.toastr.success("The item was removed.", "Removed");
        },
        (err: HttpErrorResponse) => {
          this.toastr.error(
            "There was a problem deleting the item. Please try again.",
            "Error"
          );
          intel.working = false;
          console.log(err);
        }
      );
    }
  }
}
