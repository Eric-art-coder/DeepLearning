#include <sstream>
#include <iostream>

using namespace std;

int add(int a, int b){
    int z;
    z = a + b;
    return z;
}

int main(){
    int r;
    r = add(3, 5);
    cout << "this result is " << r << endl;
    return 0;
}