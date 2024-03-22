# Jakarta EE 10 Platform

**Bootstrap a jakartaee10 project**

```bash
mvn archetype:generate -DarchetypeGroupId=org.eclipse.starter \
    -DarchetypeArtifactId=jakartaee10-minimal \
    -DarchetypeVersion=1.1.0 \
    -DgroupId=com.example -DartifactId=demo \
    -Dprofile=api -Dversion=1.0.0-SNAPSHOT \
    -DinteractiveMode=false
```