import { Directive, Output, EventEmitter, ElementRef } from '@angular/core';
declare let $: any;
@Directive({
	selector: '[appFillInTheBlanksDrag]'
})
export class FillInTheBlanksDragNdDropDirective {
	constructor(private eleRef: ElementRef) {}
	ngOnInit() {
		const self = this;
		var element = $(self.eleRef.nativeElement);
		element.draggable({
			revert: 'invalid',
			stop: function() {
				$(this).draggable('option', 'revert', 'invalid');
			}
		});
	}
}
