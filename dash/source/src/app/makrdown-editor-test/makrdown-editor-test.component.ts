import { Component, OnInit, ElementRef } from "@angular/core";
import { EditorElementsService } from "../shared/editor/editor-elements.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IntelligenceService } from "../shared/intelligences/intelligence.service";
import { HttpErrorResponse } from "@angular/common/http";
import { PartDataService } from "../shared/parts/part-data.service";
import { Location } from "@angular/common";
import { CourseService } from "../shared/courses/course.service";
import { CourseModuleService } from "../shared/modules/course-module.service";
import { LessonService } from "../shared/lessons/lesson.service";
import { ExerciseService } from "../shared/exercises/exercise.service";
import { element } from "protractor";

function _window(): any {
  return window;
}
function _document(): any {
  return document;
}

@Component({
  selector: "app-makrdown-editor-test",
  templateUrl: "./makrdown-editor-test.component.html",
  styleUrls: ["./makrdown-editor-test.component.scss"]
})
export class MakrdownEditorTestComponent implements OnInit {
  public content;
  public partData: any;
  public tinymceInit: any = {};
  elements: any[];
  intelligences: any;

  // color choices for Colored Blanks or any other as such
  colorChoices: any[];

  readonly maxWeight: number = 9;

  lesson_id: number = null;
  module_id: number = null;
  course_id: number = null;
  exercise_id: number = null;
  part_id: number = null;
  lesson: any = null;
  module: any = null;
  course: any = null;
  exercise: any = null;
  part: any = null;
  working: boolean;
  duplicteFrom: number = null;

  constructor(
    private eleRef: ElementRef,
    private editorElements: EditorElementsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private intel: IntelligenceService,
    private partSvc: PartDataService,
    private location: Location,
    private courseSvc: CourseService,
    private moduleSvc: CourseModuleService,
    private lessonSvc: LessonService,
    private exerciseSvc: ExerciseService
  ) {
    this.route.params.subscribe(resp => {
      this.lesson_id = resp.lessonID;
      this.module_id = resp.moduleID;
      this.course_id = resp.id;
      this.exercise_id = resp.exerciseID;
      this.part_id = resp.partID;

      this.colorChoices = ["#f38320", "#70ad47", "#f3b71e", "#8037b7"];

      this.FetchData();
    });

    // elements for the Editor
    this.elements = this.editorElements.elements;

    // Order the Elements alphabetically
    this.elements.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });

    // this.partData = {
    //   title: '',
    //   intelligence_id: null,
    //   screens: []
    // };

    this.content = {
      elements: [],
      html: null
    };

    this.intel.getIntelligences().subscribe(
      (resp: any) => {
        this.intelligences = resp;
      },
      (err: HttpErrorResponse) => {
        this.toastr.error("There was an error fetching intelligences", "Error");
      }
    );

    this.tinymceInit = {
      plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        "emoticons template paste textcolor colorpicker textpattern"
      ],
      toolbar:
        "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat",
      image_advtab: true,
      hieght: 500,
      file_picker_callback: function(cb, value, meta) {
        var input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");

        // Note: In modern browsers input[type="file"] is functional without
        // even adding it to the DOM, but that might not be the case in some older
        // or quirky browsers like IE, so you might want to add it to the DOM
        // just in case, and visually hide it. And do not forget do remove it
        // once you do not need it anymore.

        input.onchange = function() {
          var file = input.files[0];

          var reader = new FileReader();
          reader.onload = function() {
            // Note: Now we need to register the blob in TinyMCEs image blob
            // registry. In the next release this part hopefully won't be
            // necessary, as we are looking to handle it internally.
            var id = "blobid" + new Date().getTime();
            var blobCache = _window().tinymce.activeEditor.editorUpload
              .blobCache;
            var base64 = reader.result.split(",")[1];
            var blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);

            // call the callback and populate the Title field with the file name
            cb(blobInfo.blobUri(), { title: file.name });
          };
          reader.readAsDataURL(file);
        };

        input.click();
      }
    }; //tinymce ends
  }
  // constructor ends

  ngOnInit() {}

  FetchData() {
    // show loadin screen
    this.working = true;
    // load all the information
    // what course?
    this.courseSvc.GetCourse(this.course_id).subscribe(
      (resp: any) => {
        this.course = resp.course;
      },
      (err: HttpErrorResponse) => {
        console.log("Effor fetching course: ", err);
        this.toastr.error("Error fetching course data", "Error");
        alert(
          "There was an error loading the editor. Please try reloading the page. If it does not get fixed, please contact support"
        );
      }
    );
    // what module?
    this.moduleSvc.GetModule(this.module_id).subscribe(
      (resp: any) => {
        this.module = resp.module;
      },
      (err: HttpErrorResponse) => {
        console.log("Effor fetching module: ", err);
        this.toastr.error("Error fetching module data", "Error");
        alert(
          "There was an error loading the editor. Please try reloading the page. If it does not get fixed, please contact support"
        );
      }
    );
    // what lesson?
    this.lessonSvc.GetLesson(this.lesson_id).subscribe(
      (resp: any) => {
        this.lesson = resp.lesson;
      },
      (err: HttpErrorResponse) => {
        console.log("Effor fetching lesson: ", err);
        this.toastr.error("Error fetching lesson data", "Error");
        alert(
          "There was an error loading the editor. Please try reloading the page. If it does not get fixed, please contact support"
        );
      }
    );
    // what exercise?
    this.exerciseSvc.GetExercise(this.exercise_id).subscribe(
      (resp: any) => {
        this.exercise = resp.exercise;
        this.exercise.parts = resp.parts;
      },
      (err: HttpErrorResponse) => {
        console.log("Effor fetching exercise: ", err);
        this.toastr.error("Error fetching exercise data", "Error");
        alert(
          "There was an error loading the editor. Please try reloading the page. If it does not get fixed, please contact support"
        );
      }
    );

    // what part?
    this.partSvc.GetPart(this.part_id).subscribe(
      (resp: any) => {
        this.part = resp.part;
        this.part.intelligence = resp.intelligence;
        this.part.screens =
          resp.part.screens == "" ? [] : JSON.parse(resp.part.screens);
        this.working = false;
        this.CalculateAllScreenWeights();
      },
      (err: HttpErrorResponse) => {
        console.log("Error fetching part: ", err);
        this.toastr.error("Error fetching part data", "Error");
        this.working = false; // hide the waiting screen
        alert(
          "There was an error loading the editor. Please try reloading the page. If it does not get fixed, please contact support"
        );
      }
    );

    // at the very end, remove the splash screen
  }

  CalculateAllScreenWeights() {
    this.working = true;
    const self = this;
    this.part.screens.forEach(screen => {
      screen.totalWeight = 0;
      if (screen.elements.length > 0) {
        for (let index = 0; index < screen.elements.length; index++) {
          const element = screen.elements[index];
          const weight = this.editorElements.GetWeight(element.type);
          screen.totalWeight += weight;
        }
      }
    });
    this.working = false;
  }

  ngAfterViewInit() {}

  trackByFn(index, item) {
    return index;
  }

  ScrollToBottom() {
    _window().scrollTo(0, _document().body.scrollHeight);
  }

  AddScreen() {
    var screen: any = {
      title: "",
      elements: [],
      completed: false,
      id: new Date().getTime(),
      elementToAdd: ""
    };
    this.part.screens.push(screen);
    this.ScrollToBottom();
  }

  RemoveScreen(screenIndex) {
    if (confirm("Are you sure?")) {
      this.part.screens.splice(screenIndex, 1);
    }
  }

  InsertElement(type, screenIndex) {
    this.part.screens[screenIndex].totalWeight =
      typeof this.part.screens[screenIndex].totalWeight === "undefined"
        ? 0
        : this.part.screens[screenIndex].totalWeight;

    // first we check if the weight is already maxed out
    if (this.part.screens[screenIndex].totalWeight >= this.maxWeight) {
      return false;
    }
    // if not maxed out, first we add the weight
    // find the weight
    const elementWeight = this.editorElements.GetWeight(type);
    this.part.screens[screenIndex].totalWeight += elementWeight;

    // now add the actual component
    let elementComponent: any = {};

    switch (type) {
      // paragraph
      case "paragraph":
        elementComponent = {};
        elementComponent.type = type;
        elementComponent.source = "";
        elementComponent.type = type;
        this.part.screens[screenIndex].elements.push(elementComponent);
        break;

      // paragraph loop
      case "paragraph_loop":
        elementComponent = {};
        elementComponent.type = type;
        elementComponent.source = "";
        elementComponent.question = "";
        elementComponent.paragraphs = [];
        this.part.screens[screenIndex].elements.push(elementComponent);
        break;

      // timed_paragraph
      case "timed_paragraph":
        elementComponent = {};
        elementComponent.type = type;
        elementComponent.title = "Insert a title";
        elementComponent.helpText = "Insert a help text for the user";
        elementComponent.timeout = 10;
        elementComponent.source = "";
        elementComponent.type = "timed_paragraph";
        this.part.screens[screenIndex].elements.push(elementComponent);
        break;

      // Blanks - Simple
      case "fib_simple":
        elementComponent = {};
        elementComponent.type = type;
        elementComponent.source =
          "The sky is [blue,vast,full of stars] and [beautiful,dark]";
        elementComponent.html = "";
        elementComponent.data = {};
        elementComponent.inputs = [];
        elementComponent.type = "fib_simple";
        this.ParseBlanksSimple(elementComponent);
        this.part.screens[screenIndex].elements.push(elementComponent);

        break;

      // Blanks - Simple
      case "colored_blanks":
        elementComponent = {};
        elementComponent.type = type;
        elementComponent.source =
          "The [quick brown fox] [jumped] over [the fence]";
        elementComponent.html = "";
        elementComponent.data = {};
        elementComponent.highlights = [];
        this.ParseBlanksSimple(elementComponent);
        this.ParseHighlights(elementComponent);
        this.part.screens[screenIndex].elements.push(elementComponent);

        break;

      case "hidden_word":
        elementComponent = {};
        elementComponent.type = type;
        elementComponent.word = "";
        elementComponent.button_text = "SHOW";
        this.part.screens[screenIndex].elements.push(elementComponent);
        break;

      case "mcq_horizontal":
        elementComponent = {};
        elementComponent.type = type;
        elementComponent.question = "Enter the question";
        elementComponent.choices = [];
        this.part.screens[screenIndex].elements.push(elementComponent);
        break;

      case "audio_simple":
        elementComponent = {};
        elementComponent.type = type;
        elementComponent.title = "";
        elementComponent.audio_data = [];
        this.part.screens[screenIndex].elements.push(elementComponent);
        break;

      case "buildman":
        elementComponent = {};
        elementComponent.type = type;
        elementComponent.title = "";
        elementComponent.word = "";
        this.part.screens[screenIndex].elements.push(elementComponent);
        break;

      case "match_sides":
        elementComponent = {};
        elementComponent.type = type;
        elementComponent.title = "";
        elementComponent.sides = {
          left: [],
          right: []
        };
        this.part.screens[screenIndex].elements.push(elementComponent);
        break;

      case "qa":
        elementComponent = {};
        elementComponent.type = type;
        elementComponent.title = "";
        elementComponent.helpText = "";
        elementComponent.numberOfAnswerFields = 1;
        elementComponent.keywords = "";
        this.part.screens[screenIndex].elements.push(elementComponent);
        break;

      case "timed_qa":
        elementComponent = {};
        elementComponent.type = type;
        elementComponent.title = "";
        elementComponent.helpText = "Think about this for a while";
        elementComponent.timeout = 10;
        elementComponent.numberOfAnswerFields = 1;
        elementComponent.keywords = "";
        this.part.screens[screenIndex].elements.push(elementComponent);
        break;

      case "write_from_memory":
        elementComponent = {};
        elementComponent.type = type;
        elementComponent.title = "";
        elementComponent.lines = "";
        this.part.screens[screenIndex].elements.push(elementComponent);
        break;

      case "match_words_to_pictures":
        elementComponent = {};
        elementComponent.type = type;
        elementComponent.title = "";
        elementComponent.pictures = [];
        elementComponent.phrases = [];
        this.part.screens[screenIndex].elements.push(elementComponent);
        break;

      case "mcq_vertical":
        elementComponent = {};
        elementComponent.type = type;
        elementComponent.question = "Enter the question";
        elementComponent.choices = [];
        this.part.screens[screenIndex].elements.push(elementComponent);
        break;

      case "reorder_paragraphs":
        elementComponent = {};
        elementComponent.type = type;
        elementComponent.title = "Enter the title";
        elementComponent.paragraphs = ["", "", ""]; // get started w/ 3 empty
        this.part.screens[screenIndex].elements.push(elementComponent);
        break;

      case "reorder_sentence":
        elementComponent = {};
        elementComponent.type = type;
        elementComponent.source =
          "The sole meaning [of life] [is to] serve [humanity].";
        elementComponent.html = "";
        elementComponent.data = {};
        elementComponent.inputs = [];
        this.ParseMovableSentence(elementComponent);
        this.part.screens[screenIndex].elements.push(elementComponent);

        break;

      case "user_upload":
        elementComponent = {};
        elementComponent.type = type;
        elementComponent.setupData = {
          id: new Date().getTime(),
          helpText:"",
          type: "image/*",
          restraints: {
            size: 3 * 1024, // in KiBs
            width: 1024, // in pixels
            height: 1024
          },
          numberAllowed: 2
        };
        this.part.screens[screenIndex].elements.push(elementComponent);

        break;

      case "matrix_matching":
        elementComponent = {};
        elementComponent.title = "";
        elementComponent.type = type;
        elementComponent.helpText = "";
        elementComponent.cols = 3;
        elementComponent.rows = 2;
        elementComponent.data = [];

        elementComponent.validateInputs = comp => {
          if (comp.cols > 5) {
            comp.cols = 5;
          } else if (comp.cols < 3) {
            comp.cols = 3;
          }

          if (comp.rows > 5) {
            comp.rows = 5;
          } else if (comp.rows < 2) {
            comp.rows = 2;
          }
        };

        elementComponent.setupMatrix = comp => {
          let cols = comp.cols;
          let rows = comp.rows;
          comp.data = [];
          for (let index = 0; index <= rows; index++) {
            // extra row for the column titles. Row 1 is always column titles
            comp.data.push(Array(cols).fill(""));
          }
        };

        elementComponent.logMatrix = comp => {
          console.log(comp.data);
        };

        this.part.screens[screenIndex].elements.push(elementComponent);
        elementComponent.setupMatrix(elementComponent);

        break;

      case "voice_recording":
        elementComponent = {};
        elementComponent.title = "";
        elementComponent.type = type;
        elementComponent.helpText = "";
        elementComponent.recording = {};

        this.part.screens[screenIndex].elements.push(elementComponent);

        break;

      case "speech_recognition":
        elementComponent = {};
        elementComponent.title = "";
        elementComponent.type = type;
        elementComponent.sentence = "";
        elementComponent.helpText =
          "<p>Use the following controls to record yourself saying the following sentence and test your pronounciation</p>";
        this.part.screens[screenIndex].elements.push(elementComponent);

        break;

      default:
        this.toastr.warning(
          "Not implemented yet. Please wait a little longer while we work on it diligently.",
          "Working on it"
        );
        return;
    }

    this.ScrollToBottom();
  }

  RemoveSection(index, screenIndex) {
    if (confirm("Are you sure? You cannot undo this.")) {
      this.part.screens[screenIndex].elements.splice(index, 1);
      // recalculate the weight
      this.CalculateAllScreenWeights();
    }
  }

  ParseBlanksSimple(component) {
    let match;
    let re = /\[(.*?)\]/gim;
    let source = component.source.trim();
    let data = [];
    let lastIndex = 0;
    while ((match = re.exec(component.source))) {
      let start = lastIndex;
      lastIndex = re.lastIndex;
      let fixed = source.substring(start, match.index);
      let choices = match[1];
      data.push({ type: "fixed", node: fixed });
      data.push({ type: "choices", node: choices });
    }
    if (lastIndex < source.length) {
      let fixed = source.substring(lastIndex, source.length);
      data.push({ type: "fixed", node: fixed });
    }

    component.data = data;
  }

  ParseMovableSentence(component) {
    let match;
    let re = /\[(.*?)\]/gim;
    let source = component.source;
    let data = [];
    let lastIndex = 0;
    while ((match = re.exec(component.source))) {
      let start = lastIndex;
      lastIndex = re.lastIndex;
      let fixed = source.substring(start, match.index);
      let choices = match[1];
      data.push({ type: "fixed", node: fixed });
      data.push({ type: "movable", node: choices });
    }

    component.data = data;
  }

  AddSimpleBlanksInput(component, ele) {
    console.log(component, ele);
  }

  AskToUploadAudio(scrInd, eleInd) {
    let that = this;
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "audio/*");

    // Note: In modern browsers input[type="file"] is functional without
    // even adding it to the DOM, but that might not be the case in some older
    // or quirky browsers like IE, so you might want to add it to the DOM
    // just in case, and visually hide it. And do not forget do remove it
    // once you do not need it anymore.

    input.onchange = function() {
      let file = input.files[0];

      if (file.size > 1024 * (1024*10)) {
        alert("Sorry, please select a file that is less than 10MB");
        return;
      }

      let reader = new FileReader();
      reader.onload = function() {
        // Note: Now we need to register the blob in TinyMCEs image blob
        // registry. In the next release this part hopefully won't be
        // necessary, as we are looking to handle it internally.
        that.part.screens[scrInd].elements[eleInd].audio_data.push({
          text: "",
          type: file.type,
          fileData: this.result
        });
      };
      reader.readAsDataURL(file);
    };

    input.click();
  }

  PlayAudio(audio) {
    let sound = new Audio(audio.fileData);
    
    sound.onended = () => {
      audio.playing = false;      
    };

    audio.sound = sound;
    audio.sound.play();
    audio.playing = true;

  }

  AddPictureToWFM(scrInd, eleInd) {
    let that = this; // for using inside other functions

    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    // Note: In modern browsers input[type="file"] is functional without
    // even adding it to the DOM, but that might not be the case in some older
    // or quirky browsers like IE, so you might want to add it to the DOM
    // just in case, and visually hide it. And do not forget do remove it
    // once you do not need it anymore.

    input.onchange = function() {
      let file = input.files[0];

      if (file.size > 100 * 1024) {
        alert("Sorry, please select a file that is less than 100KB");
        return;
      }

      let reader = new FileReader();
      reader.onload = function() {
        // Note: Now we need to register the blob in TinyMCEs image blob
        // registry. In the next release this part hopefully won't be
        // necessary, as we are looking to handle it internally.
        that.part.screens[scrInd].elements[eleInd].pictures.push(this.result);
        that.part.screens[scrInd].elements[eleInd].phrases.push("");
      };
      reader.readAsDataURL(file);
    };

    input.click();
  }

  SavePart() {
    this.toastr.warning("This may take a few seconds", "Please wait");

    let data: any = {};
    data.id = this.part.id;
    data.title =
      this.exercise.title + " / Variation: " + this.part.intelligence.title;
    data.published = this.part.published;
    data.screens = JSON.stringify(this.part.screens);

    this.partSvc.SavePart(data).subscribe(
      (resp: any) => {
        this.toastr.clear();
        this.toastr.success("The part was saved.", "Success");
        this.FetchData();
        // this.location.back();
      },
      (err: HttpErrorResponse) => {
        this.toastr.error("Error saving property", "Error");
        console.log(err);
      }
    );
  }

  DuplicateContent() {
    if (
      confirm(
        "Are you sure? This will overwrite the current content with the content from the selected variation."
      )
    ) {
      this.working = true;
      this.toastr.warning("This may take a few seconds", "Please wait");
      let self = this;
      let from_id = this.duplicteFrom;
      this.partSvc.DuplicateContent(from_id, this.part.id).subscribe(
        (resp: any) => {
          this.toastr.clear();
          this.toastr.success("The part was updated.", "Success");
          this.FetchData();
          self.duplicteFrom = null;
          // this.location.back();
        },
        (err: HttpErrorResponse) => {
          this.toastr.error("Error saving property", "Error");
          console.log(err);
        }
      );
    }
  }

  ParseHighlights(component) {
    if (component.data.length) {
      const self = this;
      component.data.forEach(row => {
        if (row.type === "choices") {
          row.color =
            self.colorChoices[
              Math.floor(Math.random() * self.colorChoices.length)
            ],
          row.text = "Please enter explanatory text for this highlight"
        } else {
          row.color = false;
          row.text = false;
        }
      });
    } else {
      console.warn("Component has no DATA", component);
    }
  }

  // eof
}
