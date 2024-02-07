import { Module } from "@nestjs/common";
import { UserScriptController } from "./controllers/userScript.controller";
import { UserScriptService } from "./providers/user.service";
import { NailyContext } from "cc.naily.six.shared";
import { ScriptParserService } from "./providers/parse.service";
import { StoreScriptController } from "./controllers/storeScript.controller";
import { ScriptHealthService } from "./providers/health.service";
import { StoreScriptService } from "./providers/store.service";
import { ScriptFileService } from "./providers/file.service";

@Module({
  controllers: [UserScriptController, StoreScriptController],
  providers: [UserScriptService, ScriptParserService, StoreScriptService, ScriptHealthService, ScriptFileService],
})
export class ScriptModule extends NailyContext {}
