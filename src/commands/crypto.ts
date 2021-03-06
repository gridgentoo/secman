import { Command, flags } from "@oclif/command";
import cryptojs from "crypto-js";
import { readDataFile } from "../../app/config";
import { bold } from "../../design/layout";

export default class Crypto extends Command {
  static description = `Encrypt data using ${bold("crypto")}.`;

  static flags = {
    help: flags.help({ char: "h" }),
    sha256: flags.boolean({ char: "s", description: "SHA256 hash (Default)" }),
    sha512: flags.boolean({ char: "S", description: "SHA512 hash" }),
    md5: flags.boolean({ char: "m", description: "MD5 hash" }),
    aes: flags.boolean({ char: "a", description: "AES encrypted" }),
    "just hash": flags.boolean({
      char: "j",
      description: "just show the hash",
    }),
  };

  static args = [{ name: "STRING" }];

  async run() {
    const { args, flags } = this.parse(Crypto);

    let hash = "";

    switch (true) {
      case flags.sha256:
        if (args.STRING) {
          hash = cryptojs.SHA256(args.STRING).toString();

          if (flags["just hash"]) {
            this.log(hash);
          } else {
            this.log(`String: ${args.STRING}
Hash: ${hash}`);
          }
        } else {
          this.error("No string provided");
        }

        break;
      case flags.sha512:
        if (args.STRING) {
          hash = cryptojs.SHA512(args.STRING).toString();

          if (flags["just hash"]) {
            this.log(hash);
          } else {
            this.log(`String: ${args.STRING}
Hash: ${hash}`);
          }
        } else {
          this.error("No string provided");
        }

        break;

      case flags.md5:
        if (args.STRING) {
          hash = cryptojs.MD5(args.STRING).toString();

          if (flags["just hash"]) {
            this.log(hash);
          } else {
            this.log(`String: ${args.STRING}
Hash: ${hash}`);
          }
        } else {
          this.error("No string provided");
        }

        break;

      case flags.aes:
        if (args.STRING) {
          hash = cryptojs.AES.encrypt(
            args.STRING,
            readDataFile("master_password_hash")
          ).toString();

          if (flags["just hash"]) {
            this.log(hash);
          } else {
            this.log(`String: ${args.STRING}
Hash: ${hash}`);
          }
        } else {
          this.error("No string provided");
        }

        break;

      default:
        hash = cryptojs.SHA256(args.STRING).toString();

        if (flags["just hash"]) {
          this.log(hash);
        } else {
          this.log(`String: ${args.STRING}
Hash: ${hash}`);
        }

        break;
    }
  }
}
