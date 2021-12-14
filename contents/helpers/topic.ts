import indent from "indent-string";
import stripAnsi from "strip-ansi";
import { command } from "../../design/layout";
const wrap = require("wrap-ansi");
import { compact } from "../../tools/bool";

export function TopicFormatter(
  render: any,
  topic: any,
  config: any,
  opts: any
) {
  let description = render(topic.description || "");
  const title = description.split("\n")[0];
  description = description.split("\n").slice(1).join("\n");
  let output = compact([
    title,
    [
      command("USAGE", true),
      indent(
        wrap(`$ ${config.bin} ${topic.name}:COMMAND`, opts.maxWidth - 2, {
          trim: false,
          hard: true,
        }),
        2
      ),
    ].join("\n"),
    description &&
      [
        command("DESCRIPTION", true),
        indent(
          wrap(description, opts.maxWidth - 2, {
            trim: false,
            hard: true,
          }),
          2
        ),
      ].join("\n"),
  ]).join("\n\n");

  if (opts.stripAnsi) output = stripAnsi(output);

  return output + "\n";
}
