import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

export default {
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
  },
};
