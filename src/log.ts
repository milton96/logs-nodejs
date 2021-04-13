import fs from "fs";
import path from "path";
import moment from "moment";

export class Log {
    public static OK: String = "OK";
    public static INFO: String = "INFO";
    public static WARNING: String = "WARNING";
    public static ERROR: String = "ERROR";

    private static FECHA: String = "YYYY-MM-DD";
    private static FECHAHORA: String = "YYYY-MM-DD HH:mm:ss";

    /**
     * Crear un log y lo agrega al archivo
     * @param type Tipo de LOG
     * @param info Descripción del LOG
     */
    public static async add(type: String, info: String) {
        const date: Date = new Date();
        const text: String = `${moment(date).format(this.FECHAHORA.toString())}: ${type} - ${info}\n`;
        const filename: String = `${moment(date).format(this.FECHA.toString())}.txt`;
        const logs: String = "/logs/";
        const base_path: String = path.join(__dirname, logs.toString());
        const ruta: fs.PathLike = path.join(base_path.toString(), filename.toString());

        try {
            fs.stat(base_path.toString(), async (err, stats) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        fs.mkdir(base_path.toString(), async (err) => {
                            if (err) {
                                if (err.code === 'EEXIST') {
                                    await fs.promises.appendFile(ruta, text.toString());
                                }
                            } else {
                                await fs.promises.appendFile(ruta, text.toString());
                            }
                        });
                    }
                } else {
                    await fs.promises.appendFile(ruta, text.toString());
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * read
     * @param filename nombre del archivo
     */
    public static read(filename: String) {
        if (!filename.endsWith(".txt")) filename += ".txt";
        
        const logs: String = "/logs/";
        const base_path: String = path.join(__dirname, logs.toString());
        const ruta: fs.PathLike = path.join(base_path.toString(), filename.toString());

        fs.readFile(ruta, 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                console.log(data);
            }
        });
    }
}