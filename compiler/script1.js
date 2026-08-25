const dropdown = document.getElementById("dropdown");
const code = document.getElementById("code");

const template = {
    C: `#include <stdio.h>
int main() {
    printf("Hello, World!");
    return 0;
}`,
    Cpp: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!";
    return 0;
}`,
    Java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    Js: `console.log("Hello, World!");`,
    Python: `print("Hello, World!")`
};
code.value = template.C;
dropdown.addEventListener("change", function () {
    code.value = template[dropdown.value];
});
