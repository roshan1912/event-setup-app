# EventSetupApp

An Angular 21 event setup application built using **Angular Signal Forms** and reusable custom form controls implemented with **ControlValueAccessor (CVA)**.

The application contains two custom form controls:

- **Schedule** — date, start time and duration
- **Ticket Tiers** — dynamic list of ticket tiers with label and price

The main goal of the implementation is to keep the custom controls reusable while allowing them to participate in the parent Signal Form.

---

## Architecture

EventSetup owns the main form, with GeneralTab and TicketsTab handling their respective sections. 
Schedule and TicketTiers are reusable CVA-based custom form controls.

### Responsibilities

- `event-setup.ts` owns the event model, Signal Form, validation and submit handling.
- `event-tabs` provides the tab structure using Angular Material.
- `general-tab` and `tickets-tab` organize the fields for each section.
- `schedule.ts` is a reusable CVA for the event schedule.
- `ticket-tiers.ts` is a reusable CVA for managing dynamic ticket tiers.

The custom controls do not directly depend on the parent `EventSetup` component.

---

# Architecture Decisions

## 1. How does a value travel from the parent form into your Ticket Tiers control and back out again? What is the contract between them?

In `ticket-tiers.ts`, the control implements `ControlValueAccessor` and treats the complete ticket tier list as one value:


When the parent form provides a value, Angular calls `writeValue()`. The control then updates its internal `tiers` signal.

When the user adds, removes or updates a ticket tier, the control calls the registered `onChange()` callback with the updated array. This sends the value back to the parent form.


So the contract is simple: the parent only deals with a ticket tier array, while `TicketTiers` owns how the individual rows are edited internally.

The same approach is used by `schedule.ts`, where the control exposes:

{
  date: string;
  startTime: string;
  duration: number;
}

---

## 2. How does an invalid row inside a control end up making the parent form invalid?

The validation for `ticketTiers` is defined in `event-setup.ts` on the Signal Form path for `ticketTiers`.

The validation checks that:

- At least one ticket tier exists.
- Every tier has a non-empty label.
- Every tier has a price greater than `0`.


If any invalid row is found, a validation error is returned for the `ticketTiers` field.

This makes the parent form invalid:


I kept this validation in `event-setup.ts` because the parent form needs to know whether the complete ticket tier value is valid before allowing submission.

---

## 3. How does the surrounding form's state reach the inside of your controls?

The custom controls are connected to the Signal Form using `FormField`.

For example, `tickets-tab.html` contains:

```html
<app-ticket-tiers
  [formField]="eventForm().ticketTiers"
/>
```

The same approach is used for the Schedule control in `general-tab.html`.

The controls implement the standard CVA methods in `ticket-tiers.ts` and `schedule.ts`:

```ts
writeValue()
registerOnChange()
registerOnTouched()
setDisabledState()
```

`setDisabledState()` allows the surrounding form state to enable or disable the custom control.

The controls do not directly access the parent form or `EventSetup`. They communicate through the form-control contract.

---

## 4. Your controls are ControlValueAccessors, but the form around them is a signal form. How do the two fit together, and what would you do differently if you wrote the controls natively for signal forms instead?

The parent form is created using Signal Forms in `event-setup.ts`, while `Schedule` and `TicketTiers` use the classic Angular `ControlValueAccessor` contract.


The CVA handles:

- `writeValue()` for parent → control updates
- `onChange()` for control → parent updates
- `onTouched()` for touched state
- `setDisabledState()` for disabled state

This allows the custom controls to remain independent and reusable while still participating in the Signal Form.

If I wrote these controls natively for Signal Forms instead, I would use the Signal Forms control APIs directly and expose signal-based form state instead of implementing the classic CVA callback contract.

That would make the controls more tightly integrated with Signal Forms, but the controls would also be more specific to the Signal Forms API. I used CVA here because the assessment specifically requires classic `ControlValueAccessor` implementations.

---

## 5. Point at one reactivity decision you made, and explain what would break if you had made the opposite choice.

In `ticket-tiers.ts`, I used an Angular signal for the internal ticket tier state:

```ts
tiers = signal<{ label: string; price: number }[]>([]);
```

I chose this because the template directly reads `tiers()` and changes to the signal automatically update the rendered ticket rows.

I also use signals for the individual Schedule values in `schedule.ts`:

```ts
date = signal('');
startTime = signal('');
duration = signal<number | null>(null);
```

If I had used plain mutable properties instead, the feature could still work, but the internal state would no longer have the same explicit signal-based reactive behavior. I would be relying more on Angular's normal change detection rather than having the state itself represent the reactive dependency.

For this Angular 21 application, signals keep the internal state simple and explicit.

---

# Validation

Validation is handled by the parent Signal Form in `event-setup.ts`.

### Schedule

The Schedule is invalid when:

- Date is empty.
- Start time is empty.
- Duration is less than or equal to `0`.

### Ticket Tiers

The Ticket Tiers field is invalid when:

- No ticket tiers exist.
- A tier has an empty label.
- A tier has a price less than or equal to `0`.

The Submit button is disabled while the parent form is invalid.

---

# Testing

Unit tests are included for both custom CVA controls.

### Schedule tests

Tests cover:

- Component creation
- `writeValue()`
- Combined value propagation through `onChange`
- Touched callback
- Disabled state
- Resetting values with `null`

### Ticket Tiers tests

Tests cover:

- Component creation
- `writeValue()`
- Adding a ticket tier
- Updating a ticket tier
- Removing a ticket tier
- Touched callback
- Disabled state
- Resetting values with `null`

Basic creation tests are also included for the feature components.

Run the complete test suite with:

```bash
ng test --watch=false
```

The project uses **Vitest** through the Angular CLI.

---

The custom controls are placed under `shared/form-controls` because they are reusable form controls rather than components specific to the Event Setup feature.

---

# Technology Stack

- Angular 21
- TypeScript
- Angular Signal Forms
- ControlValueAccessor
- Angular Material
- HTML
- CSS

---

# Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to:

```text
http://localhost:4200/
```

The application automatically reloads whenever you modify any of the source files.

---

# Code Scaffolding

Angular CLI includes tools for generating components and other Angular resources.

To generate a new component:

```bash
ng generate component component-name
```

For a complete list of available schematics:

```bash
ng generate --help
```

---

# Building

To build the project, run:

```bash
ng build
```

This compiles the application and stores the build artifacts in the `dist/` directory.

---

# Running Unit Tests

To execute the unit tests:

```bash
ng test
```

For a single non-watch test run:

```bash
ng test --watch=false
```

The project uses Vitest as the test runner through the Angular CLI.

---

# Additional Resources

For more information about Angular CLI:

- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)

For Vitest:

- [Vitest Documentation](https://vitest.dev/)