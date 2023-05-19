import { writable } from 'svelte/store';

export const canvas = writable<HTMLCanvasElement>();
export const canvasCtx = writable<CanvasRenderingContext2D | null>();
