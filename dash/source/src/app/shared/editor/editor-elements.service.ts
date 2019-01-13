import { Injectable } from '@angular/core';

@Injectable()
export class EditorElementsService {
	elements = [
		{ title: 'Text/Photo', type: 'paragraph', weight: 0, icon: 'fa-edit' },
		{
			title: 'Timed Text/Photo',
			type: 'timed_paragraph',
			weight: 9,
			icon: 'fa-stopwatch'
		},
		{
			title: 'Fill in the Blanks - Simple',
			type: 'fib_simple',
			weight: 2,
			icon: 'fa-pen-alt'
		},
		{
			title: 'Hidden Word',
			type: 'hidden_word',
			weight: 2,
			icon: 'fa-eye-slash'
		},
		{
			title: 'Multiple Choice Question',
			type: 'mcq_horizontal',
			weight: 2,
			icon: 'fa-check-circle'
		},
		{
			title: 'Audio Player',
			type: 'audio_simple',
			weight: 3,
			icon: 'fa-volume-up'
		},
		{ title: 'Buildman', type: 'buildman', weight: 9, icon: 'fa-gamepad' },
		{
			title: 'Match Sides',
			type: 'match_sides',
			weight: 3,
			icon: 'fa-puzzle-piece'
		},
		{
			title: 'Question/Answer',
			type: 'qa',
			weight: 2,
			icon: 'fa-question'
		},
		{
			title: 'Timed Question/Answer',
			type: 'timed_qa',
			weight: 9,
			icon: 'fa-stopwatch'
		},
		{
			title: 'Write from Memory',
			type: 'write_from_memory',
			weight: 3,
			icon: 'fa-brain'
		},
		{
			title: 'Match Words to Pictures',
			type: 'match_words_to_pictures',
			weight: 3,
			icon: 'fa-table'
		},
		{
			title: 'Select True Sentences',
			type: 'mcq_vertical',
			weight: 3,
			icon: 'fa-check-double'
		},
		{
			title: 'Reorder Paragraphs',
			type: 'reorder_paragraphs',
			weight: 9,
			icon: 'fa-text-height'
		},
		{
			title: 'Reorder parts of a Sentence',
			type: 'reorder_sentence',
			weight: 3,
			icon: 'fa-text-width'
		},
		{
			title: 'Matrix Matching',
			type: 'matrix_matching',
			weight: 9,
			icon: 'fa-boxes'
		},
		{
			title: 'Colored Blanks',
			type: 'colored_blanks',
			weight: 3,
			icon: 'fa-fill-drip'
		},
		{
			title: 'User Upload',
			type: 'user_upload',
			weight: 3,
			icon: 'fa-cloud-upload-alt'
		},
		{
			title: 'Voice Recording and Playback',
			type: 'voice_recording',
			weight: 3,
			icon: 'fa-headset'
		},
		{
			title: 'Speech Recognition',
			type: 'speech_recognition',
			weight: 3,
			icon: 'fa-microphone-alt'
		},
		{
			title: 'Paragraph Loop',
			type: 'paragraph_loop',
			weight: 9,
			icon: 'fa-recycle'
		}
	];

	constructor() {}

	GetWeight(type) {
		for (let index = 0; index < this.elements.length; index++) {
			const element = this.elements[index];
			if (element.type === type) {
				return element.weight;
			}
		}
	}
}
