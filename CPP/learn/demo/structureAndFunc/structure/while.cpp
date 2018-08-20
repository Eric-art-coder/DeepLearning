#include <sstream>
#include <iostream>

using namespace std; 

int main()
{
    int n;
    cout << "请输入输入循环次数" << endl;

    cin >> n;

    while (n>0){
        cout << n << ", ";
        n--;
    }

    cout << "finaly" << endl;

    return 0;
}

