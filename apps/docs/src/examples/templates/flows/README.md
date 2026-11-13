# Connected surface examples

The **Patterns / Surface examples / Connected flow** Storybook story combines
the overview dashboard, Devices collection, Subscription details, and Add resource
examples. The original individual stories remain available.

| From                    | Entry point                                          | Destination                                            |
| ----------------------- | ---------------------------------------------------- | ------------------------------------------------------ |
| Home                    | Needs attention arrow or any attention item          | Devices                                                |
| Devices                 | A known device's serial number in table or card view | Its demo subscription                                  |
| Devices or Subscription | Add resource                                         | Multi-section resource form                            |
| Form                    | Cancel, then Yes, exit                               | Originating Devices or Subscription screen             |
| Form                    | Add resources on the review step                     | Originating screen with a demo completion notification |
| Subscription            | Devices breadcrumb                                   | Devices                                                |
| Devices                 | Home breadcrumb                                      | Dashboard                                              |
| Devices or Subscription | Global header Home button (desktop)                  | Dashboard                                              |

This is a local, state-based demonstration, not a production router. Reloading
the story restarts at Home; browser history and deep links within the flow are
not implemented. Collection controls reset when the collection is remounted.
Existing non-navigation placeholder actions remain unchanged.

## Fixture integration

The source PRs derive device and subscription fixtures independently. In this
flow only, `getDeviceSubscription` groups the collection's devices by device
type, subscription status, and renewal date. The selected device is first in
the subscribed list; its serial number, model, location, status, and renewal
date are preserved. Synthetic subscription keys start with `DEMO-`.

Unknown-status devices have no subscription link. Dates and days remaining use
the collection's fixed reference date rather than today's date. The assistant
panel uses a contextual demo explanation instead of the standalone subscription's
unrelated 47-device savings calculation.

Resource completion is demo-only: the notification summarizes the submitted
resource count, type, and region. No backend provisioning or collection mutation
is implied. Confirmed cancellation does not show a success notification.

The different `MetricValue` implementations remain scoped to their original
examples; they expose different visual APIs. Only page-level data collection
exports are forwarded from the templates root to avoid an ambiguous export.

## Running

From the repository root:

```sh
pnpm --filter @shared/aries-core storybook
```

Open `http://localhost:6006/?path=/story/patterns-surface-examples--connected-flow`.

Fixture regression tests:

```sh
pnpm --filter docs test:unit src/examples/templates/flows/deviceSubscriptions.test.ts
```
