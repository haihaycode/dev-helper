export function dynamicImport(components: string[]) {
  const imports: { [key: string]: any } = {};
  components.forEach((component) => {
    imports[component] = () => import(`@/${component}.vue`);
  });
  return imports;
}
