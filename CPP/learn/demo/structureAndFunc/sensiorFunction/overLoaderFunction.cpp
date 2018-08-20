// overloaded function
#include <sstream>
#include <iostream>

using namespace std; 

int devide(int a, int b){
    return a / b;
}

float devide(float a, float b){
    return a / b;
}

int main(){
    int x = 7, y = 2;
    float z = 7, m = 2;
    int r1 = devide(x, y);
    float r2 = devide(z, m);
    cout << r1 << endl;
    cout << r2 << endl;
    return 0;
}
