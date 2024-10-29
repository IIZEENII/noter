import type { Component } from "svelte";

interface State {
  isOpen: boolean;
  component: Component | null;
}

export function modalStore() {
  const state = $state<State>({ isOpen: false, component: null });

  return {
    show(component: Component | null = null) {
      state.isOpen = true;
      state.component = component;
    },
    close() {
      state.isOpen = false;
    },
    get isOpen() {
      return state.isOpen
    },
    get component() {
      return state.component;
    }
  }
}