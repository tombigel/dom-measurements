import progress from 'rollup-plugin-progress';
import filesize from 'rollup-plugin-filesize';
import { terser } from "rollup-plugin-terser";


const config = {
    input: 'domMeasurements.js',
    output: [
        {
            name: "domMeasurements",
            file: './dist/domMeasurements.js',
            format: 'umd',
            sourcemap: false
        },
        {
            name: "domMeasurements",
            file: './dist/domMeasurements.min.js',
            format: 'umd',
            sourcemap: true,
            plugins: [terser()]
        }
      ],
    plugins: [
        progress({
            clearLine: false
        }),
        filesize()
    ]
};

export default config;
