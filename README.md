## No compile error when passing non-populated entity inline to function that expects populated fields

Issue: https://github.com/mikro-orm/mikro-orm/issues/6747

To repro:
1. Clone this repo
2. Run `npm install`
3. See the 'test' here (lack of compile error): [src/populate.test.ts](src/populate.test.ts)
