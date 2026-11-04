import java.util.Properties

plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    // The Flutter Gradle Plugin must be applied after the Android and Kotlin Gradle plugins.
    id("dev.flutter.flutter-gradle-plugin")
}

val uploadSettings = Properties().apply {
    val localFile = rootProject.file("key.properties")
    if (localFile.exists()) localFile.inputStream().use { load(it) }
}
fun uploadValue(name: String, environmentName: String): String? =
    System.getenv(environmentName)?.takeIf { it.isNotBlank() }
        ?: uploadSettings.getProperty(name)?.takeIf { it.isNotBlank() }
val uploadStore = uploadValue("storeFile", "BORDERLESS_UPLOAD_KEYSTORE")
val uploadAlias = uploadValue("keyAlias", "BORDERLESS_UPLOAD_KEY_ALIAS")
val uploadStorePassword = uploadValue("storePassword", "BORDERLESS_UPLOAD_STORE_PASSWORD")
val uploadKeyPassword = uploadValue("keyPassword", "BORDERLESS_UPLOAD_KEY_PASSWORD")
val uploadReady = listOf(uploadStore, uploadAlias, uploadStorePassword, uploadKeyPassword).all { it != null }
if (gradle.startParameter.taskNames.any { it.contains("release", ignoreCase = true) } && !uploadReady) {
    throw GradleException("Release upload signing is missing. Run mobile/build-play-bundle.ps1. Debug keys cannot be used for a Play release.")
}

android {
    namespace = "io.github.mahbubhasanoly5arch.borderlesslocal"
    compileSdk = flutter.compileSdkVersion
    ndkVersion = flutter.ndkVersion

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    defaultConfig {
        // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
        applicationId = "io.github.mahbubhasanoly5arch.borderlesslocal"
        // You can update the following values to match your application needs.
        // For more information, see: https://flutter.dev/to/review-gradle-config.
        minSdk = flutter.minSdkVersion
        targetSdk = 36
        // Uses the version code from pubspec.yaml. When using split APKs, 1000 * ABI_VERSION
        // is added automatically by Flutter. (https://developer.android.com/studio/build/configure-apk-splits#configure-APK-versions)
        // You can force using the value of versionCode by specifying the `-P force-version-code-ignoring-abi=true`
        // flag during build.
        versionCode = flutter.versionCode
        versionName = flutter.versionName
    }

    signingConfigs {
        if (uploadReady) {
            create("upload") {
                storeFile = file(uploadStore!!)
                storePassword = uploadStorePassword
                keyAlias = uploadAlias
                keyPassword = uploadKeyPassword
            }
        }
    }
    buildTypes {
        release {
            if (uploadReady) signingConfig = signingConfigs.getByName("upload")
        }
    }
}

kotlin {
    compilerOptions {
        jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
    }
}

flutter {
    source = "../.."
}

dependencies {
    implementation("androidx.webkit:webkit:1.12.1")
}
