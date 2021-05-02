export class Util {
  public static initiateAllRoutes = (cbs: Function[]) => {
    if (cbs && cbs.length > 0) {
      cbs.map((cb) => {
        cb();
      });
    }
  };
}
